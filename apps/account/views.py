from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.account.api.serializers import UserSerializer, ConfirmEmailSerializer
from apps.account.models import User


class CreateUserAPIView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = []


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
