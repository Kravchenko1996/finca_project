from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView

from apps.account.api.serializers import AccountSerializer


class CreateAccountAPIView(CreateAPIView):
    serializer_class = AccountSerializer
    queryset = User.objects.all()
    permission_classes = []
