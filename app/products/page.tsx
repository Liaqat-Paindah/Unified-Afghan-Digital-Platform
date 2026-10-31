"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import {
  CheckCircle2,
  CircleDollarSign,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@base-ui/react";

import type { Product } from "@/stores/cartStore";
import { useCart } from "@/stores/cartStore";
import { useAuth } from "@/stores/userAuth";

const Products = () => {
  const cartItems = useCart((state) => state.cartItems);
  const addProducts = useCart((state) => state.addProducts);
  const removeProduct = useCart((state) => state.removeProduct);
  const clear = useCart((state) => state.clear);

  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isAuthLoading = useAuth((state) => state.isLoading);

  const router = useRouter();

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isAuthLoading, router]);

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      id: 0,
      name: "",
      price: 0,
      quantity: 1,
    },

    onSubmit: (values) => {
      const product: Product = {
        id: Number(values.id),
        name: values.name.trim(),
        price: Number(values.price),
        quantity: Number(values.quantity),
      };

      addProducts(product);
      resetForm();
    },
  });

  const cartTotal = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const totalItems = cartItems.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  if (isAuthLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white dark:bg-[#050816]">
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-500" />
          Checking your session...
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-4 py-16 text-slate-900 transition-colors dark:bg-[#050816] dark:text-white sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px] dark:bg-cyan-500/10" />

        <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-purple-500/10 blur-[110px]" />

        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm font-semibold text-cyan-500">
            <ShoppingCart className="h-4 w-4" />
            Shopping Cart
          </div>

          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Products & Cart
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                Add products to your cart and review your order before
                continuing.
              </p>
            </div>

            {cartItems.length > 0 && (
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                <ShoppingCart className="h-3.5 w-3.5" />
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Add Product */}
          <section className="rounded-sm border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
            <div className="border-b border-slate-200 p-6 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-linear-to-br from-cyan-500/10 to-blue-500/10 ring-1 ring-cyan-500/20">
                  <Package className="h-5 w-5 text-cyan-500" />
                </div>

                <div>
                  <h2 className="font-bold">Add Product</h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Add a product to your shopping cart.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Product ID */}
                <div>
                  <label
                    htmlFor="id"
                    className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Product ID
                  </label>

                  <input
                    type="number"
                    id="id"
                    name="id"
                    min={1}
                    required
                    placeholder="e.g. 101"
                    value={values.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-2 w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-white/5 dark:focus:border-cyan-500"
                  />
                </div>

                {/* Product Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Product Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter product name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-2 w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-white/5 dark:focus:border-cyan-500"
                  />
                </div>

                {/* Product Price */}
                <div>
                  <label
                    htmlFor="price"
                    className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Price
                  </label>

                  <div className="relative mt-2">
                    <CircleDollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      type="number"
                      id="price"
                      name="price"
                      min={0}
                      step="0.01"
                      required
                      placeholder="0.00"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full rounded-sm border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-white/5"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label
                    htmlFor="quantity"
                    className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Quantity
                  </label>

                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={1}
                    required
                    placeholder="1"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-2 w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-white/5"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Plus className="h-4 w-4" />
                Add to Cart
              </Button>
            </form>
          </section>

          {/* Order Summary */}
          <aside className="h-fit rounded-sm border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
            <div className="border-b border-slate-200 p-6 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-purple-500/10">
                  <CircleDollarSign className="h-5 w-5 text-purple-500" />
                </div>

                <div>
                  <h2 className="font-bold">Order Summary</h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Your current cart total
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Products
                </span>

                <span className="font-semibold">{cartItems.length}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Quantity
                </span>

                <span className="font-semibold">{totalItems}</span>
              </div>

              <div className="h-px bg-slate-200 dark:bg-white/10" />

              <div className="flex items-end justify-between">
                <span className="font-semibold">Total</span>

                <div className="text-right">
                  <p className="text-3xl font-bold tracking-tight">
                    ${cartTotal.toFixed(2)}
                  </p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Total amount
                  </p>
                </div>
              </div>

              {cartItems.length > 0 && (
                <div className="flex items-center gap-2 rounded-sm bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Your products are ready for checkout.
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Cart */}
        <section className="mt-6 rounded-sm border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-blue-500/10">
                <ShoppingCart className="h-5 w-5 text-blue-500" />
              </div>

              <div>
                <h2 className="font-bold">Cart Products</h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Review the products in your cart.
                </p>
              </div>
            </div>

            {cartItems.length > 0 && (
              <Button
                type="button"
                onClick={clear}
                className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-sm border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear Cart
              </Button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="flex min-h-60 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5">
                <ShoppingCart className="h-6 w-6 text-slate-400" />
              </div>

              <h3 className="mt-5 font-semibold">Your cart is empty</h3>

              <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                Add some products above and they will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left dark:border-white/10">
                      <th className="px-6 py-4 font-semibold">Product</th>
                      <th className="px-6 py-4 font-semibold">Price</th>
                      <th className="px-6 py-4 text-center font-semibold">
                        Quantity
                      </th>
                      <th className="px-6 py-4 font-semibold">Total</th>
                      <th className="px-6 py-4 text-right font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((product) => {
                      const lineTotal = product.price * product.quantity;

                      return (
                        <tr
                          key={product.id}
                          className="border-b border-slate-100 last:border-0 dark:border-white/5"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-linear-to-br from-cyan-500/10 to-blue-500/10">
                                <Package className="h-4 w-4 text-cyan-500" />
                              </div>

                              <div>
                                <p className="font-semibold">
                                  {product.name}
                                </p>

                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                  ID: #{product.id}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5 text-slate-600 dark:text-slate-300">
                            ${product.price.toFixed(2)}
                          </td>

                          <td className="px-6 py-5 text-center">
                            <span className="inline-flex min-w-10 items-center justify-center rounded-sm bg-slate-100 px-3 py-1.5 text-xs font-semibold dark:bg-white/5">
                              {product.quantity}
                            </span>
                          </td>

                          <td className="px-6 py-5 font-bold">
                            ${lineTotal.toFixed(2)}
                          </td>

                          <td className="px-6 py-5 text-right">
                            <Button
                              type="button"
                              onClick={() => removeProduct(product.id)}
                              className="inline-flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-500/10"
                            >
                              <X className="h-3.5 w-3.5" />
                              Remove
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>

                  <tfoot>
                    <tr className="bg-slate-50/70 dark:bg-white/2">
                      <td
                        colSpan={3}
                        className="px-6 py-5 text-right font-semibold"
                      >
                        Cart Total
                      </td>

                      <td className="px-6 py-5 text-lg font-bold">
                        ${cartTotal.toFixed(2)}
                      </td>

                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="divide-y divide-slate-200 md:hidden dark:divide-white/10">
                {cartItems.map((product) => {
                  const lineTotal = product.price * product.quantity;

                  return (
                    <div key={product.id} className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-cyan-500/10">
                            <Package className="h-4 w-4 text-cyan-500" />
                          </div>

                          <div>
                            <p className="font-semibold">{product.name}</p>

                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                              ID: #{product.id}
                            </p>
                          </div>
                        </div>

                        <Button
                          type="button"
                          onClick={() => removeProduct(product.id)}
                          className="cursor-pointer rounded-sm p-2 text-red-500 transition hover:bg-red-500/10"
                          aria-label={`Remove ${product.name}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Price
                          </p>

                          <p className="mt-1 font-semibold">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Quantity
                          </p>

                          <p className="mt-1 font-semibold">
                            {product.quantity}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Total
                          </p>

                          <p className="mt-1 font-bold">
                            ${lineTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="flex items-center justify-between bg-slate-50/70 px-5 py-5 dark:bg-white/2">
                  <span className="font-semibold">Cart Total</span>

                  <span className="text-xl font-bold">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default Products;