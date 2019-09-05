from django.urls import path

from .views import OfferList, OfferDetail

urlpatterns = [
    path('offers/', OfferList.as_view()),
    path('offers/<int:pk>/', OfferDetail.as_view()),
]
