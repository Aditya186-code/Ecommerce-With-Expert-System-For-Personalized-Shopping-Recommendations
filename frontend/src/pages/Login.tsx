import FlexBox from "../components/FlexBox"
import Typography from "@mui/material/Typography/Typography"
import {Switch,styled,Button,FormHelperText,Box,Card,FormControlLabel, makeStyles} from "@mui/material"
import LightTextField from "../components/LightTextField"
import { LoadingButton } from "@mui/lab"
import { Link,useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from 'yup'
import {useState} from 'react'
import { Theme } from "@emotion/react"
import { toast } from "react-hot-toast"
import useAuth from "hooks/useAuth"
import axios from 'axios'


export const TextFieldWrapper = styled(Box)(({ theme }:any) => ({
    width: "48%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "0.5rem",
    },
  }));
// const useStyles:Function=makeStyles((theme:Theme)=>({
//   link:{
//     textDecoration:'none'
//   }
// }))
const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });
const Login = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    let navigate = useNavigate();
async function submitForm(){
setLoading(true)
login(values.email,values.password)
toast.success("Logged-in Successfully")
navigate('/home')
setLoading(false)
// const x = await axios.get("/api/products/find/B07JW9H4J1");


}    
  const { errors, values, touched, handleBlur, handleChange, handleSubmit }=useFormik({
    initialValues:{
        email:'arakshapuri22@gmail.com',
        password:'Puri@222',
        submit:null,
        remember:true
    },validationSchema:validationSchema,onSubmit:submitForm
  })
  
  return (
    <FlexBox
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: { sm: "100%" },
        mt:'10vh'
      }}
    >
      <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 20 }}>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          mb={5}
        >
          <Box width={38} mb={1}>
            <img src="/static/pop.jpg" width="100%" alt="Logo" />
          </Box>
          <Typography variant='h1' fontSize={24} fontWeight={700}>
            Login In to E-Commerce
          </Typography>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
          

          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FlexBox justifyContent="space-between" flexWrap="wrap">
              <TextFieldWrapper>
                <Typography sx= {{fontWeight:600, mb:1}}>
                  Email
                </Typography>
                <LightTextField
                  fullWidth
                  name="email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <Typography fontWeight={600} mb={1}>
                  Password
                </Typography>
                <LightTextField
                  fullWidth
                  name="password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password || ""}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </TextFieldWrapper>
            </FlexBox>

            <FlexBox mt={2} alignItems="center" justifyContent="space-between">
              <FormControlLabel
                control={
                  <Switch
                    name="remember"
                    checked={values.remember}
                    onChange={handleChange}
                  />
                }
                label="Remember Me"
                sx={{ "& .MuiTypography-root": { fontWeight: 600 } }}
              />
              <Link style={{textDecoration:'none'}} to="/forget-password">
                <Typography sx={{color:'red'}}>Forgot Password?</Typography>
              </Link>
            </FlexBox>

            {error && (
              <FormHelperText
                error
                sx={{
                  mt: 2,
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {error}
              </FormHelperText>
            )}

            <Box sx={{ mt: 4 }}>
              {loading ? (
                <LoadingButton loading fullWidth variant="contained">
                  Sign In
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained">
                  Sign In
                </Button>
              )}
            </Box>
          </form>

          <Typography margin="auto" mt={3} color="text.disabled">
            Don't have an account?{" "}
            <Link style={{textDecoration:'none'}} to="/register">
              <Typography sx={{textDecoration:'none',ml:'1vw',color:'blue'}}>Create an account</Typography>
            </Link>
          </Typography>
        </FlexBox>
      </Card>
    </FlexBox>
  )
}

export default Login