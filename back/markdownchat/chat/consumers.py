import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    users = []

    async def connect(self):
        # Get data from route to identify room name and username
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.username = self.scope['url_route']['kwargs']['username']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

        # Add new user to users list
        self.users.append(
            {"room": self.room_name, "username": self.username, "channel_name": self.channel_name})

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

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'type': type,
            'users': self.users,
        }))

    # User leave room
    async def chat_leave_room(self, event):
        username = event['username']
        type = event['type']

        message = f"{username} left the room"

        users = filter(lambda c: c["username"] != username, self.users)
        self.users = list(users)

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'type': type,
            'users': self.users
        }))

    # User enter room
    async def chat_enter_room(self, event):
        username = event['username']
        type = event['type']
        # message = f"{username} entered the room"
        message = event['message']

        users = filter(lambda c: c["room"] == self.room_name, self.users)

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'type': type,
            'users': list(users)
        }))
