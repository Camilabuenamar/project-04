from rest_framework import serializers
from ada.serializers import SkillSerializer
from jwt_auth.serializers import UserSerializer
from .models import Applicant

class ApplicantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Applicant
        fields = ('id', 'firstname', 'lastname', 'headline', 'roles', 'linkedin', 'portfolio', 'github', 'cv')

class PopulatedApplicantSerializer(serializers.ModelSerializer):

    skills = SkillSerializer(many=True)
    user = UserSerializer()

    class Meta(ApplicantSerializer.Meta):
        fields = ('id', 'user', 'firstname', 'lastname', 'headline', 'roles', 'linkedin', 'portfolio', 'github', 'cv', 'skills')
