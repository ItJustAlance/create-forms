<template>
	<div>
		<label :for="control.id">{{ control.caption }}</label>
		<select
				:id="control.id"
				:required="control.required"
				:value="formDataResult[control.id]"
				@change="$emit('input', { id: control.id, value: $event.target.value })"
		>
			<option v-for="option in control.options" :key="option.value" :value="option.value">
				{{ option.label }}
			</option>
		</select>
		<span class="error" v-if="errors[control.id]">{{ errors[control.id] }}</span>
		
	</div>
</template>

<script>
export default {
	name: 'FormSelect',
	props: {
		control: Object,
		formDataResult: Object,
		errors: Object,
	},
};
</script>
