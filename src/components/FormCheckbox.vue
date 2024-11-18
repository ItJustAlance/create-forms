<template>
	<div>
		{{ formDataResult[control.id] }}
		<div v-for="option in control.options" :key="option.value">
			<input
					:id="`${control.id}-${option.value}`"
					type="checkbox"
					:name="control.id"
					:value="option.value"
					:checked="isChecked(option.value)"
					@change="onChange(option.value, $event.target.checked)"
			/>
			<label :for="`${control.id}-${option.value}`">{{ option.label }}</label>
		</div>
		<span class="error" v-if="errors[control.id]">{{ errors[control.id] }}</span>
	</div>
</template>

<script>
export default {
	name: 'FormCheckbox',
	props: {
		control: Object,
		formDataResult: Object,
		errors: Object,
	},
	data(){
		return {
			selected: []
		}
	},
	mounted() {
	
	},
	methods:{
		isChecked(value) {
			return Array.isArray(this.formDataResult[this.control.id]) &&
					this.formDataResult[this.control.id].includes(value);
		},
		onChange(value, isChecked) {
			let selected = this.formDataResult[this.control.id] || [];
			
			if (isChecked) {
				selected.push(value);
			} else {
				selected = selected.filter((item) => item !== value);
			}
			
			this.$emit('change', { id: this.control.id, value: selected });
		},
	}
};
</script>
