from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView

from apps.account.api.serializers import UserSerializer


class CreateUserAPIView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = []
