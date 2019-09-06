from django.contrib import admin
from .models import Skill, Applicant, Company, Offer

# Register your models here.
admin.site.register(Skill)
admin.site.register(Applicant)
admin.site.register(Company)
admin.site.register(Offer)
