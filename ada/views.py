from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly

from .models import Applicant, Company, Offer
from .serializers import ApplicantSerializer, PopulatedApplicantSerializer, CompanySerializer, PopulatedCompanySerializer, OfferSerializer, PopulatedOfferSerializer

# Create your views here.
class ApplicantList(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        applicants = Applicant.objects.all()
        serializer = PopulatedApplicantSerializer(applicants, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ApplicantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class ApplicantDetail(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get_applicant(self, pk):
        try:
            applicant = Applicant.objects.get(pk=pk)
        except Applicant.DoesNotExist:
            raise Http404

        return applicant

    def get(self, _request, pk):
        applicant = self.get_applicant(pk)
        serializer = PopulatedApplicantSerializer(applicant)
        return Response(serializer.data)

    def put(self, request, pk):
        applicant = self.get_offer(pk)
        serializer = ApplicantSerializer(applicant, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)


    def delete(self, _request, pk):
        applicant = self.get_applicant(pk)
        applicant.delete()
        return Response(status=204)

class CompanyList(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        companys = Company.objects.all()
        serializer = PopulatedCompanySerializer(companys, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class CompanyDetail(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get_company(self, pk):
        try:
            company = Company.objects.get(pk=pk)
        except Company.DoesNotExist:
            raise Http404

        return company

    def get(self, _request, pk):
        company = self.get_company(pk)
        serializer = PopulatedCompanySerializer(company)
        return Response(serializer.data)

    def put(self, request, pk):
        company = self.get_offer(pk)
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)


    def delete(self, _request, pk):
        company = self.get_company(pk)
        company.delete()
        return Response(status=204)

class OfferList(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        offers = Offer.objects.all()
        serializer = PopulatedOfferSerializer(offers, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OfferSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class OfferDetail(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get_offer(self, pk):
        try:
            offer = Offer.objects.get(pk=pk)
        except Offer.DoesNotExist:
            raise Http404

        return offer

    def get(self, _request, pk):
        offer = self.get_offer(pk)
        serializer = PopulatedOfferSerializer(offer)
        return Response(serializer.data)

    def put(self, request, pk):
        offer = self.get_offer(pk)
        serializer = OfferSerializer(offer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)


    def delete(self, _request, pk):
        offer = self.get_offer(pk)
        offer.delete()
        return Response(status=204)
