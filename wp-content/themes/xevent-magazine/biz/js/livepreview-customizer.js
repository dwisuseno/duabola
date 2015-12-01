/*

* Customizer enhancements for a better user experience.

* Xevents WordPress Theme 

* Theme URI: http:/www.wpmeal.com/xevents

* All Rights Reserved

*/



( function( $ ) {

	// Site title and description.

	wp.customize( 'blogname', function( value ) {

		value.bind( function( to ) {

			$( '.site-title a' ).text( to );

		} );

	} );

       

	wp.customize( 'blogdescription', function( value ) {

		value.bind( function( to ) {

			$( '.site-description' ).text( to );

		} );

	} );



        

   	wp.customize( 'xevents_general_linkcolor', function( value ) {

		value.bind( function( to ) {

			$('body').find('a').each(function(){ this.style.setProperty('color',to, 'important' );

		} );

	} ); 

        });

    	wp.customize( 'xevents_general_typog_tcolor', function( value ) {

		value.bind( function( to ) {

           	         $('.mid-post-title').each(function(){ this.style.setProperty('color',to, 'important' ); });

			 $('.mid-post-title a').each(function(){ this.style.setProperty('color',to, 'important' ); });

        		 $('.entry-title').each(function(){ this.style.setProperty('color',to, 'important' ); });

        		 $('.entry-title a').each(function(){ this.style.setProperty('color',to, 'important' ); });

	} );

        });

      	wp.customize( 'xevents_general_linkdeco', function( value ) {

		value.bind( function( to ) {

			 $('body').find('a').each(function(){ this.style.setProperty('text-decoration',to, 'important' );

		});

	});

        });

       	wp.customize( 'xevents_general_fontfamily', function( value ) {

		value.bind( function( to ) {

			  $('body,h2,a').each(function(){ this.style.setProperty('font-family',to, 'important' );

		});

	});  

        });

	wp.customize( 'xevents_general_fontstyle', function( value ) {

		value.bind( function( to ) {

			  $('body').each(function(){ this.style.setProperty('font-style',to, 'important' );

		});

	});

        }); wp.customize( 'xevents_general_typog_psize', function( value ) {

		value.bind( function( to ) {

			  $('body p').each(function(){ this.style.setProperty('font-size',to, 'important' );

		});

	});

       });   wp.customize( 'xevents_general_typog_color', function( value ) {

		value.bind( function( to ) {

			  $('body p').each(function(){ this.style.setProperty('color',to, 'important' );

		});

	});

         });   wp.customize( 'xevents_general_typog_tcolor', function( value ) {

		value.bind( function( to ) {

			  $('.mid-post-title a').each(function(){ this.style.setProperty('color',to, 'important' );

		});

	});

       });   wp.customize( 'xevents_general_weight', function( value ) {

		value.bind( function( to ) {

			  $('body,h2,a').each(function(){ this.style.setProperty('font-weight',to, 'important' );

		});

        });

        });   wp.customize( 'xevents_general_typog_scolor', function( value ) {

		value.bind( function( to ) {

			  $('.star-fg .fa-star').each(function(){ this.style.setProperty('color',to, 'important' );

		});

	});

        });

      	wp.customize( 'xevents_general_headline_bordercolor', function( value ) {

		value.bind( function( to ) {

        $('.pmodule1_title').each(function(){ this.style.setProperty('border-bottom','1px solid '+to, 'important'); });

        $('.title_makeup').each(function(){ this.style.setProperty('border-bottom','5px solid '+to, 'important') ; });

        $('#header').each(function(){ this.style.setProperty('border-bottom','1px solid '+to, 'important') ; } );

        $('.cat_makeup').each(function(){ this.style.setProperty('border-left','2px solid '+to, 'important') ; });

        $('.pw_title').each(function(){ this.style.setProperty('border-bottom','1px solid '+to, 'important') ; });

        $('.w_title_makeup').each(function(){ this.style.setProperty('border-bottom','5px solid '+to, 'important') ; });

        $('#content_holder').find('.featured').each(function(){ this.style.setProperty('color',to, 'important') ; });

        $('#content_holder').find('.news').each(function(){ this.style.setProperty('color',to, 'important') ; });



	} );

        

        });

           	wp.customize( 'xevents_general_bg_container', function( value ) {

		value.bind( function( to ) {

                $('.container').each(function(){   this.style.setProperty('background-color',to, 'important' ); });

                });

                });

      wp.customize( 'xevents_general_headline_color', function( value ) {

        value.bind( function( to ) {

        $('.title_makeup').each(function(){ this.style.setProperty('color',to, 'important') ; });

        $('.w_title_makeup').each(function(){ this.style.setProperty('color',to, 'important') ; });

         });

         });

                /************************************header settings****************************************/

               wp.customize( 'xevents_header_logoimage', function( value ) {

		value.bind( function( to ) {

  			 $('#logo img').attr('src',to );

		});

	});

              wp.customize( 'xevents_header_logomargin', function( value ) {

		value.bind( function( to ) {

			 $('#logo').css('margin',to+'px' );

		});

	})   

                wp.customize( 'xevents_header_logopadding', function( value ) {

		value.bind( function( to ) {

			 $('#logo').css('padding',to+'px' );

		});

	}); 

            

            

        /* wp.customize( 'header_textcolor', function( value ) {

		value.bind( function( to ) {

			 $('#header').each(function(){ this.style.setProperty('color',to, 'important' );

		});

	});

       });*/   wp.customize( 'xevents_header_linkcolor', function( value ) {

		value.bind( function( to ) {

			$('#header').find('a').each(function(){ this.style.setProperty('color',to, 'important' );

		});

	});

         });   wp.customize( 'xevents_header_backcolor', function( value ) {

		value.bind( function( to ) {

			 $('#header').find('.yamm').each(function(){ this.style.setProperty('background-color',to, 'important' );

		});

	});

           });   wp.customize( 'xevents_header_fontfamily', function( value ) {

		value.bind( function( to ) {

                	 $('#header').each(function(){ this.style.setProperty('font-family',to, 'important' ); });

			 $('#header').find('a').each(function(){ this.style.setProperty('font-family',to, 'important' );

		});

	});

       });   wp.customize( 'xevents_header_fontstyle', function( value ) {

		value.bind( function( to ) {

			 $('#header').each(function(){ this.style.setProperty('font-style',to, 'important' ); });

                         $('#header').find('a').each(function(){ this.style.setProperty('font-style',to, 'important' );



		});

	});

          });   wp.customize( 'xevents_header_typog_size', function( value ) {

		value.bind( function( to ) {

			 $('#header').each(function(){ this.style.setProperty('font-size',to, 'important' ); });

                        $('#header').find('a').each(function(){ this.style.setProperty('font-size',to, 'important' );



		});

	});

            });   wp.customize( 'xevents_header_weight', function( value ) {

		value.bind( function( to ) {

			 $('#header').each(function(){ this.style.setProperty('font-weight',to, 'important' ); });

                        $('#header').find('a').each(function(){ this.style.setProperty('font-weight',to, 'important' );



		});

	});

      });   wp.customize( 'header_image', function( value ) {

		value.bind( function( to ) {

			 $('#header').find('.yamm').each(function(){ this.style.setProperty('background-image','url('+to+')', 'important' );



		});
		}); 
		});
	wp.customize( 'xevents_header_backmenucolor', function( value ) {

		value.bind( function( to ) {

			 $('#header').find('.nav_wrapper').each(function(){ this.style.setProperty('background-color',to, 'important' );



		});

	});  
	});   

                /************************************footer settings****************************************/

        wp.customize( 'xevents_footer_textcolor', function( value ) {

		value.bind( function( to ) {

			 $('#footer').each(function(){ this.style.setProperty('color',to, 'important' ); });

                	 $('#footer').find('.widget-title').each(function(){ this.style.setProperty('color',to, 'important' );



});

	}); 

      });   wp.customize( 'xevents_footer_backcolor', function( value ) {

		value.bind( function( to ) {

			 $('#footer').each(function(){ this.style.setProperty('background-color',to, 'important' );



		});

	});  

     });   wp.customize( 'xevents_footer_backimage', function( value ) {

		value.bind( function( to ) {

			 $('#footer').each(function(){ this.style.setProperty('background-image','url('+to+')', 'important' );



		});

	});        

     });   wp.customize( 'xevents_footer_linkcolor', function( value ) {

		value.bind( function( to ) {

			 $('#footer').find('a').each(function(){ this.style.setProperty('color',to, 'important' );



		});

	});  

   });   wp.customize( 'xevents_footer_fontfamily', function( value ) {

		value.bind( function( to ) {

                	 $('#footer').each(function(){ this.style.setProperty('font-family',to, 'important' );});

			 $('#footer').find('a').each(function(){ this.style.setProperty('font-family',to, 'important' );

		});

	});

       });   wp.customize( 'xevents_footer_fontstyle', function( value ) {

		value.bind( function( to ) {

			 $('#footer').each(function(){ this.style.setProperty('font-style',to, 'important' );});

                         $('#footer').find('a').each(function(){ this.style.setProperty('font-style',to, 'important' );

                    });

	});

          });   wp.customize( 'xevents_footer_typog_size', function( value ) {

		value.bind( function( to ) {

			 $('#footer').each(function(){ this.style.setProperty('font-size',to, 'important' );});

                        $('#footer').find('a').each(function(){ this.style.setProperty('font-size',to, 'important' );});

                 	 $('#footer').find('.widget-title').each(function(){ this.style.setProperty('font-size',to, 'important' );});





		

	});

             });   wp.customize( 'xevents_footer_weight', function( value ) {

		value.bind( function( to ) {

			 $('#footer').each(function(){ this.style.setProperty('font-weight',to, 'important' );});

                        $('#footer').find('a').each(function(){ this.style.setProperty('font-weight',to, 'important' );});

                 	 $('#footer').find('.widget-title').each(function(){ this.style.setProperty('font-weight',to, 'important' );});



		});

	});

        

                       

                    /************************************sidebar settings****************************************/

    

     

     

   



} )( jQuery );