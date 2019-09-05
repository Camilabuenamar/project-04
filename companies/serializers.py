from rest_framework import serializers
from ada.models import Offer
from jwt_auth.serializers import UserSerializer
from .models import Company

class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'name', 'location', 'description', 'website', 'women_achievements', 'employees', 'women_employees_percentaje')

class OfferSerializer(serializers.ModelSerializer):

    class Meta:
        model = Offer
        fields = ('id', 'name', 'level')


class PopulatedOfferSerializer(serializers.ModelSerializer):

    offers = OfferSerializer(many=True)
    user = UserSerializer()

    class Meta(OfferSerializer.Meta):
        fields = ('id', 'user', 'name', 'location', 'description', 'website', 'women_achievements', 'employees', 'women_employees_percentaje', 'offers')
