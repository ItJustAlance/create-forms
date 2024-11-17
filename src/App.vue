<template>
<div id="app">
	<h2>{{ jsonData.title }}</h2>
	<div v-for="(form, index) in forms" :key="index" class="form">
		<FormDynamic :json="form" />
	</div>
	
</div>
</template>

<script lang="ts">
import Vue from "vue";
import FormDynamic from "@/components/FormDynamic.vue";

const jsonData = {
	"title": "Открыть договор",
	"controls": [
		{
			"id": "5927943491",
			"control": "FORM",
			"caption": "Открыть договор",
			"parentID": "",
			"tabIndex": 0,
			"position": 0,
		},
		{
			"id": "5927943492",
			"control": "TEXT",
			"caption": "Кредит",
			"parentID": "5927943491",
			"tabIndex": 1,
			"position": 2,
			"type": "text",
			"required": "true"
		},
		{
			"id": "5927943493",
			"control": "BUTTON",
			"caption": "OK",
			"parentID": "5927943491",
			"tabIndex": 4,
			"position": 4,
			"type": "button",
		},
		{
			"id": "5927943494",
			"control": "BUTTON",
			"caption": "Отмена",
			"parentID": "5927943491",
			"tabIndex": 5,
			"position": 5,
			"type": "button",
		},
		{
			"id": "5927943495",
			"control": "LABEL",
			"caption": "Вид кредита",
			"parentID": "5927943492",
			"tabIndex": -1,
			"position": 1,
			"type": "label",
		},
		{
			"id": "5927943496",
			"control": "TEXT",
			"caption": "Финансовый продукт",
			"parentID": "5927943491",
			"tabIndex": 6,
			"position": 3,
			"required": "true",
			"type": "text",
		},
		{
			"id": "123",
			"control": "FORM",
			"caption": "Открыть договор 2",
			"parentID": "",
			"tabIndex": 0,
			"position": 0,
		},
		{
			"id": "1234",
			"control": "TEXT",
			"caption": "Ипотека",
			"parentID": "123",
			"tabIndex": 1,
			"position": 2,
			"type": "text",
			"required": "true"
		},
		{
			"id": "11",
			"control": "RADIO",
			"caption": "Радио",
			"parentID": "123",
			"tabIndex": 1,
			"position": 3,
			"type": "radio",
			"required": "true",
			"options": [
				{ "value": "option1", "label": "Вариант 1" },
				{ "value": "option2", "label": "Вариант 2" },
				{ "value": "option3", "label": "Вариант 3" },
				{ "value": "option4", "label": "Вариант 4" }
			]
		},
		{
			"id": "198",
			"control": "CHECKBOX",
			"caption": "Чебокс",
			"parentID": "123",
			"position": 3,
			"required": "true",
			"options": [
				{ "value": "check1", "label": "Чебокс 1" },
				{ "value": "check2", "label": "Чебокс 2" }
			]
		},
		{
			"id": "7890",
			"control": "SELECT",
			"caption": "Выберите из списка",
			"parentID": "123",
			"position": 4,
			"required": "true",
			"options": [
				{ "value": "sel1", "label": "option 1" },
				{ "value": "sel2", "label": "option 2" }
			]
		},
		{
			"id": "1222",
			"control": "BUTTON",
			"caption": "OK",
			"parentID": "123",
			"tabIndex": 4,
			"position": 4,
			"type": "button",
		},
		{
			"id": "1444",
			"control": "BUTTON",
			"caption": "Отмена",
			"parentID": "123",
			"tabIndex": 5,
			"position": 5,
			"type": "button",
		},
	],
	"submitUrl": "/api/submitForm"
};

import { Control, JsonData } from "@/types/interface";




export default Vue.extend({
	name: "App",
	components: {
		FormDynamic,
	},
	data(): {
		jsonData: JsonData;
	} {
		return {
			jsonData: jsonData as JsonData,
		};
	},

	computed: {
		forms(): JsonData[]  {
			const formControls = this.jsonData.controls.filter((control: Control) => control.control === "FORM");
			
			// Создаем новый массив форм с дочерними элементами
			const formsArray = formControls.map((form: Control) => {
				return {
					
					controls: [form, ...this.jsonData.controls.filter(control => control.parentID === form.id)] ,
				};
			});
			console.log('formsArray', formsArray)
			return formsArray;
		},
	},
});
</script>
