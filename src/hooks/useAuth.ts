import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCredentials, logout } from '@/store/authSlice'
import { EndPoints, ROUTES } from '@/constants'
import { api } from '@/lib/api'
import { toast } from 'sonner'

export const useLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const data = await api.post(EndPoints.Login, credentials)
      return data
    },
    onSuccess: (data: any) => {
      const user = data?.data?.data?.user ?? data?.data?.user
      const token = data?.data?.data?.token ?? data?.data?.token
      

      dispatch(setCredentials({ token, user }))

      if (user?.role === 'ADMIN') {
        toast.success("Welcome, Admin!")
        navigate('/admin/users')
      } else {
        toast.success("Welcome back!")
        navigate(ROUTES.Home)
      }
    },
    onError: () => {
      toast.error("Login failed! Wrong email or password.")
    },
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: {
      name: string
      email: string
      phone?: string
      password: string
    }) => {
      const data = await api.post(EndPoints.Register, payload)
      return data
    },
  })
}

export const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return () => {
    dispatch(logout())
    navigate(ROUTES.Login)
  }
}