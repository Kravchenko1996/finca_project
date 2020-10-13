from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.account.api.serializers import UserSerializer, ConfirmEmailSerializer, AccountSerializer, CategorySerializer, \
    TransactionSerializer
from apps.account.models import Category, Transaction, Account


class CreateUserAPIView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = []


class CreateAccountAPIView(CreateAPIView):
    serializer_class = AccountSerializer

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        return self.create(request, *args, **kwargs)


class ListAccountAPIView(ListAPIView):
    serializer_class = AccountSerializer

    def get_queryset(self):
        accounts = Account.objects.filter(user=self.request.user.id)
        return accounts


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


class CreateCategoryAPIView(CreateAPIView):
    serializer_class = CategorySerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class EditCategoryAPIView(UpdateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class DeleteCategoryAPIView(DestroyAPIView):
    queryset = Category.objects.all()


class ListCategoryAPIView(ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class CreateTransaction(CreateAPIView):
    serializer_class = TransactionSerializer


class ListTransactionAPIView(ListAPIView):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()
