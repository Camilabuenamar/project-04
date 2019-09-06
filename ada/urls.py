from django.urls import path

from .views import ApplicantList, ApplicantDetail, CompanyList, CompanyDetail, OfferList, OfferDetail

urlpatterns = [
    path('applicants/', ApplicantList.as_view()),
    path('applicants/<int:pk>/', ApplicantDetail.as_view()),
    path('companies/', CompanyList.as_view()),
    path('companies/<int:pk>/', CompanyDetail.as_view()),
    path('offers/', OfferList.as_view()),
    path('offers/<int:pk>/', OfferDetail.as_view()),
]
