from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from api.views import *

urlpatterns = [
    # Work In Progress
    # path('', views.IndexView.as_view(), name='index'),
    path('login/',  TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', UserListAPIView.as_view(), name='userList'),
    path('users/<int:pk>', UserDetailAPIView.as_view(), name='userDetail'),
    # path('home/', views.?????.as_view(), name='home'),
    # path('categories/', views.?????.as_view(), name='categories'),
    path('albums/', get_users_albums, name='userAlbumList'),
    path('albums/<int:pk>/', get_album_detail.as_view(), name='userAlbumDetail'),
    path('albums/<int:pk>/photo/', get_photos_from_album, name='userPhotoList'),
    path('albums/<int:album_pk>/photo/<int:photo_pk>/', get_photo_detail.as_view(), name='userPhotoDetail'),

    path('categories/', category_list),
    path('categories/<int:pk>/', category_detail),

]