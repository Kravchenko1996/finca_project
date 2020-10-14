from django.urls import path
from rest_framework_jwt.views import refresh_jwt_token, obtain_jwt_token

from apps.account.api.views import CreateUserAPIView, ConfirmEmailAPIView, CreateAccountAPIView, CreateCategoryAPIView, \
    ListCategoryAPIView, CreateTransaction, ListTransactionAPIView, ListAccountAPIView, EditCategoryAPIView, \
    DeleteCategoryAPIView

urlpatterns = [
    path('users/', CreateUserAPIView.as_view()),
    path('api-token-generate/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
    path('email-confirm', ConfirmEmailAPIView.as_view()),
    path('create-account', CreateAccountAPIView.as_view()),
    path('accounts', ListAccountAPIView.as_view()),
    path('create-category', CreateCategoryAPIView.as_view()),
    path('categories', ListCategoryAPIView.as_view()),
    path('edit-category/<str:pk>', EditCategoryAPIView.as_view()),
    path('delete-category/<str:pk>', DeleteCategoryAPIView.as_view()),
    path('create-transaction', CreateTransaction.as_view()),
    path('transactions', ListTransactionAPIView.as_view())
]
