from django.urls import path

from apps.account.views import CreateAccountAPIView

urlpatterns = [
    path('accounts/', CreateAccountAPIView.as_view())
]