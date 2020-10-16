from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.account.api.serializers import UserSerializer, ConfirmEmailSerializer, AccountSerializer, \
    CategorySerializer, TransactionSerializer, InvalidRequestDataException
from apps.account.models import Category, Transaction, Account


class CreateUserAPIView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = []


class CreateAccountAPIView(CreateAPIView):
    serializer_class = AccountSerializer
    permission_classes = []

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
        try:
            if serializer.is_valid():
                serializer.save()
                return Response('ok', 200)
        except InvalidRequestDataException:
            return Response({"detail": "Invalid code!"}, 500)


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

    def get_queryset(self):
        return Category.objects.filter(account=self.request.user.id)


class CreateTransaction(CreateAPIView):
    serializer_class = TransactionSerializer


class ListTransactionAPIView(ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(account=self.request.user.id)
