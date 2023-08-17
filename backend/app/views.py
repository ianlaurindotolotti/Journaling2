from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import Post
from .serializer import PostSerializer
from django.contrib.auth.models import User
from .serializer import UserSerializer
from django.contrib.auth.hashers import make_password


class HomeView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        print(request.user)
        try:
            user = request.user
            notes = Post.objects.filter(user=user)
            serializer = PostSerializer(notes, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=404)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                return Response({"error": "refresh_token is missing"}, status=status.HTTP_400_BAD_REQUEST)
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response(status=status.HTTP_205_RESET_CONTENT)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data['password'] = make_password(data['password'])  
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DeleteView(APIView):
    def post(self, request, id):
        post = Post.objects.get(id=id)
        post.delete()
        return Response("Deleted")
    

class CreateView(APIView):
    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class UpdateView(APIView):
    def put(self, request, id):
        post = Post.objects.get(id=id)
        data = request.data
        data['user'] = request.user.id
        serializer = PostSerializer(post, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
