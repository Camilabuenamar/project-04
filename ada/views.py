from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Offer
from .serializers import OfferSerializer, PopulatedOfferSerializer

# Create your views here.
class OfferList(APIView):

    def get(self, _request):
        offers = Offer.objects.all()
        serializer = PopulatedOfferSerializer(offers, many=True)
        return Response(serializer.data)


class OfferDetail(APIView):

    def get_offer(self, pk):
        try:
            offer = Offer.objects.get(pk=pk)
        except Offer.DoesNotExist:
            raise Http404

        return offer

    def get(self, _request, pk):
        offer = self.get_offer(pk)
        serializer = OfferSerializer(offer)
        return Response(serializer.data)
