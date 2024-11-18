<template>
<div class="dynamic-form">
	<h3>{{ formInfo.caption }}</h3>
	<form @submit.prevent="onSubmit">
		<div v-for="control in controls" :key="control.id" class="form-control">
			<component
					:is="getComponent(control.control)"
					:control="control"
					:formDataResult="formDataResult"
					:errors="errors"
					@input="handleInput"
					@change="handleChange"
					@button-click="onButtonClick"
			/>
			
		</div>
	</form>
</div>
</template>

<script lang="ts">
import Vue from "vue";

import { Control, FormData } from "@/types/interface";

import FormText from "@/components/FormText.vue";
import FormRadio from "@/components/FormRadio.vue";
import FormCheckbox from "@/components/FormCheckbox.vue";
import FormSelect from "@/components/FormSelect.vue";
import FormButton from "@/components/FormButton.vue";
import FormLabel from "@/components/FormLabel.vue";


export default Vue.extend({
	name: "FormDynamic",
	props: {
		json: {
			type: Object,
			required: true,
		},
	},
	data(): {
		formData: FormData;
		formDataResult: Record<string, string[]>;
		errors: Record<string, string>;
	} {
		return {
			formData: this.json as FormData,
			formDataResult: {} as Record<string, string[]>,
			errors: {} as Record<string, string>,
		};
	},
	watch: {
		// Сохраняем при вводе данных
		'formDataResult': {
			handler: function () {
				this.saveToLocalStorage()
			},
			deep: true
		}
},
	computed: {
		controls(): Control[] {
			// Возвращаем элементы управления, отсортированные по позиции
			return [...this.formData.controls].sort((a, b) => a.position - b.position);
		},
		formInfo(): Control | undefined {
			return this.formData?.controls.find(el => el.control === "FORM");
		}
	},
	created() {
		this.loadFromLocalStorage();
	},
	mounted() {
		
		},
	methods: {
		getComponent(controlType: string) {
			const componentsMap: Record<string, any> = {
				TEXT: FormText,
				RADIO: FormRadio,
				CHECKBOX: FormCheckbox,
				SELECT: FormSelect,
				BUTTON: FormButton,
				LABEL: FormLabel,
			};
			return componentsMap[controlType] || "div";
		},
		handleInput({ id, value }: { id: string; value: string | string[] }) {
			this.$set(this.formDataResult, id, value);
		},
		handleChange({ id, value }: { id: string; value: string }) {
			this.$set(this.formDataResult, id, value);
			this.saveToLocalStorage();

		},
		// Сохраняем в localStorage.
		saveToLocalStorage() {
			if (!this.formInfo?.id) {
				console.log("Не удалось сохранить форму: отсутствует id формы.");
				return;
			}
			
			const result = {
				idFormData: this.formInfo?.id,
				data: this.formDataResult
			};
			
			// Получаем текущие формы из localStorage
			const savedForms = JSON.parse(localStorage.getItem("formValues") || "{}");
			
			// Сохраняем данные формы по её id
			savedForms[result.idFormData] = result.data;
			localStorage.setItem("formValues", JSON.stringify(savedForms));
		},
		// Загружаем значений из localStorage.
		loadFromLocalStorage() {
			const savedValues = JSON.parse(localStorage.getItem("formValues") || "{}");
			if (this.formInfo?.id && savedValues[this.formInfo.id]) {
				this.formDataResult = savedValues[this.formInfo.id];
			}
		},
		
		// Валидация поля.
		validateField(id: string) {
			const control = this.formData.controls.find((c) => c.id === id);
			if (control?.required) {
				// уточняем тип т.к. у нас или строка или массив чебоксов
				const value = this.formDataResult[id] as string | string[] | undefined;
				if (typeof value === 'string') {
					if (value.trim() === '') {
						this.errors[id] = "Это поле обязательно для заполнения.";
					} else {
						delete this.errors[id];
					}
				} else if (Array.isArray(value)) {
					if (value.length === 0) {
						this.errors[id] = "Выберите хотя бы один вариант.";
					} else {
						delete this.errors[id];
					}
				} else {
					// Обработка других случаев, например, если значение не определено
					this.errors[id] = "Некорректное значение.";
				}
			}
		},

		onButtonClick(control: Control) {
			console.log('control', control)
			if (control.caption === "OK") {
				// можно сохранять при отправке формы
				// this.saveToLocalStorage;
				//this.onSubmit();
			} else if (control.caption === "Отмена") {
				this.formDataResult = {};
				this.errors = {};
				localStorage.removeItem("formValues");
			}
		},
		// Проверяем валидность всех полей
		onValidForm(){
			this.formData.controls.forEach((control) => {
				if (control.required) {
					this.validateField(control.id);
				}
			});
		},
		onSubmit() {
			this.errors = {};
			this.onValidForm();
			// Если есть ошибки, прекращаем отправку
			if (Object.keys(this.errors).length > 0) {
				return;
			}
			
			// Выводим данные в консоль
			console.log("Данные формы:", this.formDataResult);
		},
	},
	
});
</script>

<style>
.dynamic-form {
	max-width: 500px;
	margin: auto;
	font-family: Arial, sans-serif;
	padding: 30px;
	border: 1px solid #d0d0d0;
}
.form + .form {
	margin-top: 40px;
}

.form-control {
	margin-bottom: 15px;
	display: flex;
	flex-direction: column;
}
.label-caption {
	display: block;
	font-weight: bold;
	padding-bottom: 5px;
}

.error {
	color: red;
	font-size: 0.9em;
	margin-top: 0.2em;
}
</style>
