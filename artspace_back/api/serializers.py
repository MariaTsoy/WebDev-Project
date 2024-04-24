from rest_framework import serializers

from api.models import *
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    banner = serializers.URLField(source="userprofile.banner", allow_blank=True)
    photo = serializers.URLField(source="userprofile.photo", allow_blank=True)
    desc = serializers.CharField(source="userprofile.desc", allow_blank=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'banner', 'photo', 'email', 'desc']

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        if MyUser.objects.get(id=instance.id):
            profile = MyUser.objects.get(id=instance.id)
            profile_data = validated_data.get('userprofile')

            profile.banner = profile_data.get('banner', profile.banner)
            profile.photo = profile_data.get('photo', profile.photo)
            profile.desc = profile_data.get('desc', profile.desc)
            profile.save()
        else:
            MyUser.objects.create(user=instance)

        return instance


class AlbumSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=200)

    def create(self, validated_data):
        album = Album.objects.create(title=validated_data['title'])
        return album

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance


class PhotoSerializer(serializers.ModelSerializer):
    album = AlbumSerializer(read_only=True)
    album_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Photo
        fields = ('id', 'title', 'url', 'album', 'album_id')


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    photo = serializers.URLField()


class AllPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllPhoto
        fields = ('id', 'title', 'description', 'photo', 'size', 'category')
