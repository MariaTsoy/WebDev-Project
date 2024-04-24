from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class MyUser(models.Model):
    user = models.OneToOneField(User, related_name='userprofile', on_delete=models.CASCADE)

    banner = models.URLField(blank=True)
    photo = models.URLField(blank=True)
    desc = models.TextField(blank=True)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def to_json(self):
        return {
            'id': self.user.id,
            'username': self.user.username,
            # "password": self.user.check_password;
            "banner": self.banner,
            "photo": self.photo,
            "email": self.email,
            "desc": self.desc,
        }

    def __str__(self):
        return f'{self.user.username}#{self.id}'

class Album(models.Model):
    name = models.CharField(max_length=500, default="")
    title = models.CharField(max_length=500)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="users")

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'name': self.name,
            'user': self.user
        }

    def __str__(self):
        return f'{self.title}'


class Category(models.Model):
    name = models.CharField(max_length=200)
    photo = models.URLField(max_length=1000)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class AllPhoto(models.Model):
    SIZE_CHOICES = (('small', 'small'), ('medium', 'medium'), ('large', 'large'))
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=500)
    photo = models.URLField(max_length=10000)
    size = models.CharField(max_length=200, choices=SIZE_CHOICES)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, related_name='photos')

    def __str__(self):
        return f'{self.title} : {self.category}'


class Photo(models.Model):
    url = models.CharField(max_length=10000000)
    title = models.CharField(max_length=500)
    description = models.TextField(max_length=1000)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, null=True, related_name="albums")

    def to_json(self):
        return {
            'id': self.id,
            'url': self.url,
            'title': self.title,
            'description': self.description,
            'album': self.album.to_json()
        }
