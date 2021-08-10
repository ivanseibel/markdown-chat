import sys
from chat.models import SignedUser
from channels.db import database_sync_to_async
import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def get_users_list(self):
        users = SignedUser.objects.filter(room=self.room_name).values()
        return list(users)

    @database_sync_to_async
    def get_user(self):
        return SignedUser.objects.filter(
            username=self.username,
            room=self.room_name,
        ).first()

    @database_sync_to_async
    def add_user(self):
        SignedUser.objects.create(
            username=self.username,
            room=self.room_name,
            channel_name=self.channel_name,
        )

    @database_sync_to_async
    def remove_user(self):
        SignedUser.objects.filter(
            username=self.username, room=self.room_name).delete()

    async def connect(self):
        # Get data from route to identify room name and username
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.username = self.scope['url_route']['kwargs']['username']
        self.room_group_name = 'chat_%s' % self.room_name

        # user = await self.get_user(username=self.username, room_name=self.room_name)
        user = await self.get_user()

        # If found, refuse connection
        if (user):
            await self.close()
            return

        await self.add_user()

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

        # Send message to room group
        message = f"{self.username} entered the room"
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_enter_room',
                'message': message,
                'username': self.username,
            }
        )

    async def disconnect(self, close_code):
        # Remove disconnected from the users list
        await self.remove_user()

        # Send message to room group
        message = f"{self.username} left the room"
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_leave_room',
                'message': message,
                'username': self.username,
            }
        )

        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']
        type = text_data_json['type']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': type,
                'message': message,
                'username': username,
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        username = event['username']
        type = event['type']

        users = await self.get_users_list()

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'type': type,
            'users': users,
        }))

    # User leave room
    async def chat_leave_room(self, event):
        username = event['username']
        type = event['type']
        message = event['message']

        users = await self.get_users_list()

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'type': type,
            'users': users
        }))

    # User enter room
    async def chat_enter_room(self, event):
        username = event['username']
        type = event['type']
        message = event['message']

        users = await self.get_users_list()

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'type': type,
            'users': users
        }))
