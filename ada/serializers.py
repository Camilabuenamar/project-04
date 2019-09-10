from rest_framework import serializers
from jwt_auth.serializers import UserSerializer
from .models import Applicant, Company, Offer

class ApplicantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Applicant
        fields = ('id', 'firstname', 'lastname', 'image', 'headline', 'roles', 'linkedin', 'portfolio', 'github', 'cv', 'skills',)

class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'name', 'logo', 'location', 'industry', 'description', 'website', 'women_achievements', 'employees', 'women_employees_percentaje')

class OfferSerializer(serializers.ModelSerializer):

    class Meta:
        model = Offer
        fields = ('id', 'company', 'jobtitle', 'role', 'wage', 'experience_in_years', 'description_of_role', 'technologies', 'qualifications', 'benefits',)

class PopulatedApplicantSerializer(serializers.ModelSerializer):

    user = UserSerializer()

    class Meta(ApplicantSerializer.Meta):
        fields = ('id', 'user', 'firstname', 'lastname', 'image', 'headline', 'roles', 'linkedin', 'portfolio', 'github', 'cv', 'skills',)

class PopulatedCompanySerializer(serializers.ModelSerializer):

    offers = OfferSerializer(many=True)
    user = UserSerializer()

    class Meta(CompanySerializer.Meta):
        fields = ('id', 'user', 'name', 'logo', 'location', 'industry', 'description', 'website', 'women_achievements', 'employees', 'women_employees_percentaje', 'offers')

class PopulatedOfferSerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    applications_received = ApplicantSerializer(many=True)

    class Meta(OfferSerializer.Meta):
        fields = ('id', 'company', 'jobtitle', 'role', 'wage', 'experience_in_years', 'description_of_role', 'technologies', 'qualifications', 'benefits', 'applications_received')
