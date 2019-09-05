from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly

from .models import Applicant
from .serializers import ApplicantSerializer, PopulatedApplicantSerializer

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
        serializer = ApplicantSerializer(applicant)
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
