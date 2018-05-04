  $('.js-quickview').on('click', function () {
	// Входящие параметры
		var product_url = $(this).data('product-url');
		var product_id = $(this).data('product-id');
		
	// Вызываем модальное окошко
		alertify.panel({
		  target: $('[data-modal="quickview-product"]').html(),
		  position: 'quickview',
		  onOpen: function (modal) {
			InSalesUI.Filter.create($(modal));
			Products.initInstance($('.product-form'));
		  }
		});
		
	// Получаем страницу товара
		var jqxhr = $.get(product_url, function() {
			// .js-product-block - часть контента, которую вырезаем со страницы товара
			// .js-quickview-product - блок, в который вставляем вырезаную часть контента
			// Вставляем на страницу превью товара
				$(".js-quickview-product").html($(jqxhr.responseText).find('.js-product-block'));
			
			// Скрываем описание (если нужно)
				$('.js-product-block').find('.product-descr').hide();
			
			// Обновляем форму
				Products.initInstance($('.product-form'));

			// Прогружаем галерею
				var _galleryThumbs = {
					slidesPerView: 4,
					spaceBetween: 16,

					breakpoints: {
					  768: { slidesPerView: 1 },
					  1024: { slidesPerView: 4 }
					}
				};

				var _productSliderOptions = {
					slidesPerView: 4,
					spaceBetween: 16,
					breakpoints: {
					  380: { slidesPerView: 1 },
					  480: { slidesPerView: 2 },
					  768: { slidesPerView: 2 },
					  1024: { slidesPerView: 3 }
					}
				};

				var SimillarSwiper = new Swiper('[data-slider="similar-products"]', _productSliderOptions);
				var RelatedSwiper = new Swiper('[data-slider="related-products"]', _productSliderOptions);
				var BundleSwiper = new Swiper('[data-slider="bundle-products"]', _productSliderOptions);

				if ($('[data-slider="gallery-thumbs"]').length) {
					var MainSwiper = new Swiper('[data-slider="gallery-thumbs"]', _galleryThumbs);
				}

				var MobileSwiper = new Swiper('[data-slider="gallery-thumbs-mobile"]', _galleryThumbs);
				  
			// События, при нажатии на превью галереи
				$(document).on('click', '.js-copy-src', function (event) {
					event.preventDefault();
					copySrc(this);
					var product_id = $('.product-control').attr('data-compare');
					var select_variant;
					var href = $(this).attr('href');

					Products.get(product_id)
					  .done(function (product) {
						select_variant = _.find(product.variants, function (variant) {
						  return (href == variant.first_image.original_url);
						});

						if (!select_variant) {
						  return;
						}
						Products.getInstance($('.product-form'))
						  .done(function (_product) {
							return _product.variants.setVariant(select_variant.id);
						  });
					  });
				});
				
			// Перезагружаем плагин MagicZoom
				MagicZoom.refresh()
		});
  });