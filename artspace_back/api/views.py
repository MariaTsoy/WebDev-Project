from django.shortcuts import render, Http404
from rest_framework import generics, mixins, status
from rest_framework.permissions import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.views import APIView

from django.contrib.auth.models import User
from api.models import *
from api.serializers import *


class UserListAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, pk):
        try:
            return User.objects.get(id=pk)
        except User.DoesNotExist as e:
            raise Http404

    def get(self, request, pk=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk=None):
        user = self.get_object(pk)
        serializer = UserSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk=None):
        user = self.get_object(pk)
        user.delete()
        return Response({'message': 'deleted'}, status=204)


class get_album_detail(APIView):
    def get_object(self, pk):
        try:
            return Album.objects.get(id=pk)
        except Album.DoesNotExist as e:
            raise Http404

    def get(self, request, pk=None):
        album = self.get_object(pk)
        serializer = AlbumSerializer(album)
        return Response(serializer.data)

    def put(self, request, pk=None):
        album = self.get_object(pk)
        serializer = AlbumSerializer(instance=album, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk=None):
        album = self.get_object(pk)
        album.delete()
        return Response({'message': 'deleted'}, status=204)


class get_photo_detail(APIView):
    def get_object(self, album_pk, photo_pk):
        try:
            return Album.objects.get(id=album_pk).albums.get(id=photo_pk)
        except Photo.DoesNotExist as e:
            raise Http404

    def get(self, request, album_pk, photo_pk):
        photo = self.get_object(album_pk, photo_pk)
        serializer = PhotoSerializer(photo)
        return Response(serializer.data)

    def delete(self, request, album_pk, photo_pk):
        photo = self.get_object(album_pk, photo_pk)
        photo.delete()
        return Response({'message': 'deleted'}, status=204)


@api_view(['GET', 'POST'])
def get_users_albums(request):
    if request.method == 'GET':
        albums = Album.objects.filter()
        serializer = AlbumSerializer(albums, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AlbumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def get_photos_from_album(request, pk):
    try:
        album = Album.objects.get(id=pk)
        photos = Photo.objects.filter(album_id=pk)
    except Photo.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)

    if request.method == 'GET':
        serializer = PhotoSerializer(photos, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PhotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    elif request.method == "PUT":
        serializer = AlbumSerializer(instance=album, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    elif request.method == "DELETE":
        album.delete()
        return Response({'message': 'deleted'}, status=204)


@api_view(['GET'])
@authentication_classes([])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([])
def category_detail(request, pk):
    try:
        photos = Category.objects.get(id=pk).photos.all()
    except Category.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)
    serializer = AllPhotoSerializer(photos, many=True)
    return Response(serializer.data)
