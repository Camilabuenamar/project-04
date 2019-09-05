from django.urls import path

from .views import ApplicantList, ApplicantDetail

urlpatterns = [
    path('applicants/', ApplicantList.as_view()),
    path('applicants/<int:pk>/', ApplicantDetail.as_view()),
]
