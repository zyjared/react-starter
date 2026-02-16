import { zodResolver } from '@hookform/resolvers/zod'
import { useSignIn } from '@kit/features/auth'
import { Field, FieldError, FieldGroup, FieldLabel } from '@kit/ui/components/ui/field'
import { Button } from '@kit/ui/foundation/button.js'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@kit/ui/foundation/card.js'
import { Input } from '@kit/ui/foundation/input.js'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export function Login() {
  const navigate = useNavigate()
  const signIn = useSignIn()

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'demo',
      password: 'password',
    },
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      await signIn.mutateAsync(data)
      toast.success('Login successful')
      navigate('/', { replace: true })
    }
    catch (error) {
      console.error(error)
      toast.error('Login failed', {
        description: 'Please check your credentials and try again.',
      })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      placeholder="demo"
                      autoComplete="username"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex w-full flex-col gap-2">
            <Button type="submit" className="w-full" form="login-form" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
            <p className="w-full text-center text-sm text-muted-foreground">
              Use 'demo' and any password.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
