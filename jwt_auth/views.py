import datetime
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
import jwt
from .serializers import UserSerializer
from django.contrib.auth.models import User

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            user = serializer.instance

            payload = {
                'sub': user.id,
                'iat': datetime.datetime.utcnow(),
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=6)
            }

            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

            return Response({'message': 'Registration successful', 'token': token})

        return Response(serializer.errors, status=422)


class LoginView(APIView):
    def get_user(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = self.get_user(username)

        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        payload = {
            'sub': user.id,
            'iat': datetime.datetime.utcnow(),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=6)
        }

        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'user': user.id})
