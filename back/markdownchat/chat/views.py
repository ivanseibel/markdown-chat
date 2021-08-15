from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from .models import SignedUser


@csrf_exempt
def get_signed_user(request, username, room_name):
    if request.method == 'GET':
        user_exists = SignedUser.objects.filter(
            username=username, room=room_name).first() != None
        return JsonResponse({"user_exists": user_exists}, status=200)
    else:
        return JsonResponse({"message": "bad request"}, status=400)
