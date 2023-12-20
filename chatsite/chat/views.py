from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ChatMessage
from .serializers import ChatMessageSerializer

class ChatMessageListCreateView(APIView):
    serializer_class = ChatMessageSerializer

    def get(self, request):
        chat_messages = ChatMessage.objects.all().order_by('-timestamp')[:50]
        serializer = self.serializer_class(chat_messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)