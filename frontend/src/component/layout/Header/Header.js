import React from 'react'
import "./Header.css"
import {useEffect, useState, Fragment} from "react"
import PersonIcon from '@material-ui/icons/Person';
import CartIcon from "@material-ui/icons/ShoppingCart"
import SearchIcon from "@material-ui/icons/Search"
import HomeIcon  from "@material-ui/icons/Home"
import AppIcon from "@material-ui/icons/Apps"
import InfoIcon from "@material-ui/icons/Info"
import ContactIcon from "@material-ui/icons/Contactless"

import { useHistory } from "react-router-dom";

const Header = () =>{      

    let history = useHistory()
   
    const [flag, setFlag] = useState(0)

    const setAdd = () => {
        setFlag(1)
    }

    const setSub = () => {
        setFlag(0)
    }

    const productFunc = () => {
        history.push("/products")
    }

    const homeFunc = () => {
        history.push("/")
    }

    const loginFunc = () => {
        history.push("/login")
    }

    const cartFunc = () => {
        history.push("/cart")
    }

    const searchFunc = () => {
        history.push("/search")
    }
    
    const aboutFunc = () => {
        history.push("/about")
    }

    const contactFunc = () => {
        history.push("/contact")
    }
  
    return (
<Fragment >
    <div className ="imageBtn" onMouseEnter={setAdd} >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzQtVaFsMwuu_u-KTJKnJADhQVQp9Beh4wA&usqp=CAU" alt="menu" />
</div>
        {(flag>0) &&       
               
       <Fragment>
        <div onMouseLeave={setSub}  >
             
        
            <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>


<div id="wrapper">

    
        <div id="sidebar-wrapper">
            <nav id="spy">
                <ul class="sidebar-nav nav">

                <li class="sidebar-brand" >
                        <a href="/"><span class="fa fa-home solo">
                           
                            </span></a>
                    </li>
                    <li class="sidebar-brand" >
                        <a href="/"><span class="fa fa-home solo">
                           
                            </span></a>
                    </li>

                    <li class="sidebar-brand" onMouseEnter={homeFunc}>
                        <a href="/" data-scroll><span class="fa fa-home solo">
                            <HomeIcon fontSize="large" />
                            Home
                            </span></a>
                    </li>
                    <li class="sidebar-brand" onMouseEnter={productFunc}>
                        <a href="/products" data-scroll>
                            <span class="fa fa-anchor solo">
                                <AppIcon fontSize="large" />
                                Products
                                </span>
                        </a>
                   
                    </li>
                    <li class="sidebar-brand" onMouseEnter={loginFunc}>
                        <a href="/login" data-scroll>
                            <span class="fa fa-anchor solo">
                                <PersonIcon fontSize="large" />
                                Login
                                </span>
                        </a>
                    </li>
                    <li class="sidebar-brand" onMouseEnter={cartFunc}> 
                        <a href="/cart" data-scroll>
                            <span class="fa fa-anchor solo">
                                <CartIcon fontSize="large" />
                                Cart
                                </span>
                        </a>
                    </li>
                    <li class="sidebar-brand" onMouseEnter={searchFunc}>
                        <a href="/search" data-scroll>
                            <span class="fa fa-anchor solo">
                                <SearchIcon fontSize="large" />
                                Search
                                </span>
                        </a>
                    </li>
                    <li class="sidebar-brand" onMouseEnter={aboutFunc}>
                        <a href="/about" data-scroll>
                            <span class="fa fa-anchor solo">
                                <InfoIcon fontSize="large" />
                                About
                                </span>
                        </a>
                    </li>
                    <li class="sidebar-brand" onMouseEnter={contactFunc}>
                        <a href="/contact" data-scroll>
                            <span class="fa fa-anchor solo">
                                <ContactIcon fontSize="large" />
                                Contact
                                </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        </div>

    </div>
    </Fragment>
        
          } 
          </Fragment>
           )
}

export default Header