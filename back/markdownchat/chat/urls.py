from django.urls import path

from . import views

urlpatterns = [
    path('get_signed_user/<str:room_name>/<str:username>',
         views.get_signed_user, name='get_signed_user'),
]
