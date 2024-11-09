import { LazyExoticComponent,Suspense,FC,lazy } from "react";
import LoadingScreen from "./components/LoadingScreen";
import AuthGuard from "utils/AuthGuard";
import Dashboard from "pages/Dashboard";




const Loadable = (Component:LazyExoticComponent<FC>) => (props:any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
  const Login = Loadable(lazy(() => import("./pages/Login")));
  const Register = Loadable(lazy(() => import("./pages/Register")));
  
  const Home = Loadable(lazy(() => import("./pages/Home")));
  const Shop = Loadable(lazy(() => import("./pages/Shop")));
  const ViewProduct=Loadable(lazy(() => import("./pages/ViewProduct")));
  const User=Loadable(lazy(()=>import("./pages/UserProfile")))
  const Cart=Loadable(lazy(()=>import("./pages/Cart")))
  const routes = [
    {
      path: "/",
      element: (
        <Login />
       ),
    },
    {
      path:"login",
      element:<Login/>
    },{
      path:'register',
      element:(<Register/>)
    },{
      path:"home",
      element:(<AuthGuard><Home/></AuthGuard>)
    },{
      path: "dashboard",
      element:(<AuthGuard><Dashboard/></AuthGuard>),
      children:[{
       path: "",
       element: <Shop/>
      },{
        path: "shop",
        element: <Shop/>,
        
          
        
       }
    ,
    {
      path:'dashboard/view-product/:id',
      element:<ViewProduct/>
    },{
      path:"view-product/:id",
      element:<ViewProduct/>
    }
    ,{
      path:"user",
      element:<User/>
    },{
      path:"cart",
      element:<Cart/>
    }]
    }
    ]
export default routes