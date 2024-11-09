import { PhotoCamera } from "@mui/icons-material";

import {
  alpha,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  styled,
  Switch,
} from "@mui/material";
import axios from 'utils/axios'
import UkoAvatar from "components/UkoAvatar";
import useAuth from "hooks/useAuth";
import LightTextField from "components/LightTextField";
import { Small, Tiny } from "components/Typography";
import { useFormik } from "formik";
import useTitle from "hooks/useTitle";
import { FC,useState } from "react";
import * as Yup from "yup";
import axiosInstance from "utils/axios";
import toast from "react-hot-toast";
import { UPDATE_USER } from "redux/userReducer";
import { useDispatch } from "react-redux";

// styled components
const ButtonWrapper = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
//   backgroundColor:
//     theme.palette.mode === "light"
//       ? theme.palette.secondary[200]
//       : alpha(theme.palette.primary[100], 0.1),
}));

const UploadButton = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  border: "2px solid",
  alignItems: "center",
  justifyContent: "center",
  borderColor: theme.palette.background.paper,
//   backgroundColor:
//     theme.palette.mode === "light"
//       ? theme.palette.secondary[400]
//       : alpha(theme.palette.background.paper, 0.9),
}));

const SwitchWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: 10,
}));

const AddNewUser: FC = () => {
  // change navbar title
  useTitle("User Profile");
  const dispatch=useDispatch()
  const { login,logout, user } = useAuth();
  const initialValues = {
    fullName: user!=null&&user.fullName?user.fullName:"",
    email: user!=null&&user.email?user.email:"",
    phone: user!=null&&user.phone?user.phone:98,
    country: user!=null&&user.country?user.country:"",
    state: user!=null&&user.state?user.state:"",
    city: user!=null&&user.city?user.city:"",
    address: user!=null&&user.address?user.address:'',
    zip: user!=null&&user.zip?user.zip:"",
    about: user!=null&&user.about?user.about:"",
    
    
  };
  const [image,setimage]=useState(user?.image)
  const [preview,setpreview]=useState(image?.filePath)
  const validationSchema = Yup.object().shape({
    
    fullName: Yup.string().required("Name is Required!"),
    
    email: Yup.string().email().required("Email is Required!"),
    phone: Yup.number().min(8).required("Phone is Required!"),
    country: Yup.string().required("Country is Required!"),
    state: Yup.string().required("State is Required!"),
    city: Yup.string().required("City is Required!"),
    address: Yup.string().required("Address is Required!"),
    zip: Yup.number().required("Zip is Required!"),
    about: Yup.string().required("About is Required!"),
  });
  const handleImageChange=(e:any)=>{
  
    setimage(e.target.files[0])
    setpreview(URL.createObjectURL(e.target.files[0]))
  }
  const updateUser=async(e:any)=>{
  
  
    const access_token=localStorage.getItem('accessToken')
    console.log(df)
  
    
    try{
    
    const response=await axios.put(`users/${user?._id}`,df,{headers:{token:access_token}})
    const {image}=response.data
    dispatch(UPDATE_USER(image.filePath))
    toast.success("User Profile Updated Successfully")
    }
    
    
    
    
    catch(error:any){
      console.log(error)
    }
    }
  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit:updateUser,
    validateOnChange:true
  });
  
  const df=new FormData()
  df.append('fullName',values.fullName)
  df.append('city',values.city)
  df.append('address',values.address)
  df.append('phone',values.phone)
  df.append('zip',values.zip)
  df.append('about',values.about)
  df.append('image',image)
  df.append('country',values.country)
  df.append('state',values.state)
  console.log(df)
  
  return (
    <Box pt={2} pb={4} sx={{width:'70vw',margin:'auto'}}>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Card
              sx={{
                padding: 3,
                boxShadow: 2,
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ButtonWrapper>
                <UploadButton>
                  <label htmlFor="upload-btn">
                    <input
                      // accept="image/*"
                      name="image"
                      id="upload-btn"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <IconButton component="span">
                    <UkoAvatar
              src={preview}
              sx={{ width: 90, height: 90 }}
            />
                    </IconButton>
                  </label>
                </UploadButton>
              </ButtonWrapper>

              <Small
                marginTop={2}
                maxWidth={200}
                lineHeight={1.9}
                display="block"
                textAlign="center"
                color="text.disabled"
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
              </Small>

              <Box maxWidth={250} marginTop={5} marginBottom={1}>
                <SwitchWrapper>
                  <Small display="block" fontWeight={600}>
                    Public Profile
                  </Small>
                  <Switch defaultChecked />
                </SwitchWrapper>

                <SwitchWrapper>
                  <Small display="block" fontWeight={600}>
                    Banned
                  </Small>
                  <Switch defaultChecked />
                </SwitchWrapper>
                <Tiny display="block" color="text.disabled" fontWeight={500}>
                  Apply disable account
                </Tiny>

                <SwitchWrapper>
                  <Small display="block" fontWeight={600}>
                    Email Verified
                  </Small>
                  <Switch defaultChecked />
                </SwitchWrapper>
                <Tiny display="block" color="text.disabled" fontWeight={500}>
                  Disabling this will automatically send the user a verification
                  email
                </Tiny>
              </Box>
            </Card>
          </Grid>
          <Grid item md={8} xs={12}>
            <Card sx={{ padding: 3, boxShadow: 2 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="fullName"
                      placeholder="Full Name"
                      value={values.fullName}
                      onChange={handleChange}
                      error={Boolean(touched.fullName && errors.fullName)}
                    //   helperText={touched.fullName && errors.fullName}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="email"
                      placeholder="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                    //   helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="phone"
                      placeholder="Phone Number"
                      value={values.phone}
                      onChange={handleChange}
                      error={Boolean(touched.phone && errors.phone)}
                    //   helperText={touched.phone && errors.phone}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="country"
                      placeholder="Country"
                      value={values.country}
                      onChange={handleChange}
                      error={Boolean(touched.country && errors.country)}
                    //   helperText={touched.country && errors.country}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="state"
                      placeholder="State/Region"
                      value={values.state}
                      onChange={handleChange}
                      error={Boolean(touched.state && errors.state)}
                    //   helperText={touched.state && errors.state}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="city"
                      placeholder="City"
                      value={values.city}
                      onChange={handleChange}
                      error={Boolean(touched.city && errors.city)}
                    //   helperText={touched.city && errors.city}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="address"
                      placeholder="Address"
                      value={values.address}
                      onChange={handleChange}
                      error={Boolean(touched.address && errors.address)}
                    //   helperText={touched.address && errors.address}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="zip"
                      placeholder="Zip/Code"
                      value={values.zip}
                      onChange={handleChange}
                      error={Boolean(touched.zip && errors.zip)}
                    //   helperText={touched.zip && errors.zip}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <LightTextField
                      multiline
                      fullWidth
                      rows={10}
                      name="about"
                      placeholder="About"
                      value={values.about}
                      onChange={handleChange}
                      error={Boolean(touched.about && errors.about)}
                    //   helperText={touched.about && errors.about}
                      sx={{
                        "& .MuiOutlinedInput-root textarea": { padding: 0 },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default AddNewUser;
