from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.account.api.serializers import UserSerializer, ConfirmEmailSerializer, AccountSerializer


class CreateUserAPIView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = []


class CreateAccountAPIView(CreateAPIView):
    serializer_class = AccountSerializer

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        return self.create(request, *args, **kwargs)


class ConfirmEmailAPIView(APIView):
    permission_classes = []
    serializer_class = ConfirmEmailSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('ok', 200)
        else:
            return Response('Error', 400)
