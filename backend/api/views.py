from rest_framework import viewsets
from .models import Customer, Product, Order, Queue
from .serializers import CustomerSerializer, ProductSerializer, OrderSerializer, QueueSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().order_by("id")
    serializer_class = CustomerSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by("id")
    serializer_class = ProductSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by("-created_at").prefetch_related("items__product")
    serializer_class = OrderSerializer

class QueueViewSet(viewsets.ModelViewSet):
    queryset = Queue.objects.all().order_by("-created_at")
    serializer_class = QueueSerializer

    def create(self, request, *args, **kwargs):
        # Generate the next ticket number
        last_ticket = Queue.objects.count()
        ticket_number = last_ticket + 1

        request.data["ticket_number"] = ticket_number
        request.data["status"] = "waiting"

        return super().create(request, *args, **kwargs)