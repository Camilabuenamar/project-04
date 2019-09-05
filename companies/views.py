from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly

from .models import Company
from .serializers import CompanySerializer, PopulatedCompanySerializer

# Create your views here.
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
        serializer = CompanySerializer(company)
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
