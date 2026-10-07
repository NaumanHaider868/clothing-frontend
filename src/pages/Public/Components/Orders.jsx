import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../../../utlis/customAPI";
import { apiError } from "../../../utlis/apiError";
import { money } from "../../../utlis/product";
import { useAuth } from "../../../context/AuthContext";

export default function Orders() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const placed = searchParams.get("placed");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api
      .get("/order/mine")
      .then((response) => {
        if (active) setOrders(Array.isArray(response.data?.data) ? response.data.data : []);
      })
      .catch((err) => {
        if (active) setError(apiError(err, "Unable to load orders"));
      });
    return () => {
      active = false;
    };
  }, []);

  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <div className="orders-page pt-[65px] pr-[52px]">
      <h1 className="text-[28px] font-bold tracking-[2px]">YOUR ORDERS</h1>
      {user ? (
        <div className="account">
          {name ? <strong>{name}</strong> : null}
          <span>{user.email}</span>
          {user.phone ? <span>{user.phone}</span> : null}
          {user.address ? <span>{user.address}</span> : null}
        </div>
      ) : null}
      {placed ? <p className="pt-4">Order #{placed} is placed. Payment will be collected later.</p> : null}
      {error ? <p className="pt-4">{error}</p> : null}
      {!error && orders.length === 0 ? (
        <div className="shop-empty">
          <p>No orders yet</p>
          <span>When you place an order, it will show here.</span>
        </div>
      ) : null}
      <div className="pt-8 flex flex-col gap-6">
        {orders.map((order) => (
          <div key={order.id} className="border border-[#D9D9D9] p-4">
            <div className="flex justify-between">
              <span>Order #{order.id}</span>
              <span>{order.status}</span>
            </div>
            <div className="pt-3">
              {(order.items || []).map((item) => (
                <div key={item.id} className="flex justify-between py-1">
                  <span>{item.productName} · {item.color} / {item.size} · {item.quantity}</span>
                  <span>{money(item.lineTotal)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-3 font-semibold">
              <span>Total</span>
              <span>{money(order.total)}</span>
            </div>
          </div>
        ))}
      </div>
      <Link to="/products" className="inline-block pt-8 hover:underline">Continue shopping</Link>
    </div>
  );
}
