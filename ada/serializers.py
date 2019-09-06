from rest_framework import serializers
from jwt_auth.serializers import UserSerializer
from .models import Skill, Applicant, Company, Offer

class SkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = Skill
        fields = ('id', 'name', 'level')

class ApplicantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Applicant
        fields = ('id', 'firstname', 'lastname', 'image', 'headline', 'roles', 'linkedin', 'portfolio', 'github', 'cv')

class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'name', 'location', 'description', 'website', 'women_achievements', 'employees', 'women_employees_percentaje')

class OfferSerializer(serializers.ModelSerializer):

    class Meta:
        model = Offer
        fields = ('id', 'company', 'jobtitle', 'role', 'wage', 'experience_in_years', 'description_of_role', 'description_of_role', 'qualifications', 'benefits', 'applications_received')

class PopulatedApplicantSerializer(serializers.ModelSerializer):

    skills = SkillSerializer(many=True)
    user = UserSerializer()

    class Meta(ApplicantSerializer.Meta):
        fields = ('id', 'user', 'firstname', 'lastname', 'image', 'headline', 'roles', 'linkedin', 'portfolio', 'github', 'cv', 'skills')

class PopulatedCompanySerializer(serializers.ModelSerializer):

    offers = OfferSerializer(many=True)
    user = UserSerializer()

    class Meta(OfferSerializer.Meta):
        fields = ('id', 'user', 'name', 'logo', 'location', 'description', 'website', 'women_achievements', 'employees', 'women_employees_percentaje', 'offers')

class PopulatedOfferSerializer(serializers.ModelSerializer):

    skills = SkillSerializer(many=True)
    company = CompanySerializer()

    class Meta(OfferSerializer.Meta):
        fields = ('id', 'company', 'jobtitle', 'role', 'wage', 'experience_in_years', 'description_of_role', 'description_of_role', 'qualifications', 'benefits', 'applications_received', 'skills')
