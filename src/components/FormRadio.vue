<template>
	<div>
		<div v-for="option in control.options" :key="option.value">
			<input
					:id="`${control.id}-${option.value}`"
					type="radio"
					:name="control.id"
					:checked="isChecked(option.value)"
					:value="option.value"
					@input="$emit('input', { id: control.id, value: $event.target.value })"
			/>
			<label :for="`${control.id}-${option.value}`">{{ option.label }}</label>
		</div>
		
		<span class="error" v-if="errors[control.id]">{{ errors[control.id] }}</span>
	</div>
</template>

<script>
export default {
	name: 'FormRadio',
	props: {
		control: Object,
		formDataResult: Object,
		errors: Object,
	},
	methods:{
		isChecked() {
			return this.formDataResult[this.control.id]
		},

	}
};
</script>
