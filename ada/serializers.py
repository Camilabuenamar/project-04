from rest_framework import serializers
from .models import Offer, Skill

class OfferSerializer(serializers.ModelSerializer):

    class Meta:
        model = Offer
        fields = ('id', 'company', 'jobtitle', 'role', 'wage', 'experience_in_years', 'description_of_role', 'description_of_role', 'qualifications', 'benefits', 'applications_received')

class SkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = Skill
        fields = ('id', 'name', 'level')

class PopulatedOfferSerializer(serializers.ModelSerializer):

    skills = SkillSerializer(many=True)

    class Meta(OfferSerializer.Meta):
        fields = ('id', 'company', 'jobtitle', 'role', 'wage', 'experience_in_years', 'description_of_role', 'description_of_role', 'qualifications', 'benefits', 'applications_received', 'skills')
