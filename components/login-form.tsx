"use client";
import { login } from "@/action/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { loginSchema, LoginSchema } from "@/features/auth/schema/login-schema";
import { getErrorMessage } from "@/lib/api/error";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ShowToast } from "./common/show-toast";
import { InputField } from "./form/input-field";
import { Spinner } from "./ui/spinner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (payload: LoginSchema) => {
    setIsLoading(true);
    try {
      await login(payload);
      ShowToast({
        title: "Success",
        description: "Login successful",
        type: "success",
      });
      router.push("/");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      ShowToast({
        title: "Error",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <InputField
                form={form}
                name="email"
                label="E-mail"
                disabled={isLoading}
                required
              />
              <InputField
                form={form}
                name="password"
                label="Password"
                type="password"
                disabled={isLoading}
                required
              />
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner /> : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
