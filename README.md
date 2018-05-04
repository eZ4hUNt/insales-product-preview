**Скрипт "Предпросмотр товара в модальном окне"**
===============================
![Предпросмотр](https://raw.githubusercontent.com/eZ4hUNt/insales-product-preview/master/preview.png)

**Как использовать**
===============================
1. В шаблон "collection.liquid" вставляем шаблон кастомизации вариантов (если нужно) 
```
{% include 'templates' %}
```
	
2. В шаблоне "product_card.liquid" вставляем кнопку вызова модали с превью
```
<div class="quickview js-quickview" data-product-id="{{ product.id }}" data-product-url="{{ product.url }}"><i class="fa fa-external-link fa-fw"></i>Быстрый просмотр</div>
```
	
3. В шаблоне "modals.liquid" или в другом месте всталяем блок вызова модали (блок, в который будет вставляеться превью товара) 
```
<script type="text/template" data-modal="quickview-product">
	<div class="js-quickview-product"></div>
</script>
```
	*где "js-quickview-product" - класс блока, в который будет вставляется превью товара*
	
4. В шаблоне "product.liquid", часть контента, который должен быть в превью, заключаем в блок
``` 
<div class="js-product-block"></div>
```
**Отсылка**
===============================
За помощь в реализации отдельное и большое спасибо *Viktor Marchyk* и *Dmitriy Webmaster*!
