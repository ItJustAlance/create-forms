<template>
	<div>
		<label :for="control.id">{{ control.caption }}</label>
		<input
				:id="control.id"
				type="text"
				:required="control.required"
				:placeholder="control.caption"
				:value="formDataResult[control.id]"
				@input="$emit('input', { id: control.id, value: $event.target.value })"
		/>
		<span class="error" v-if="errors[control.id]">{{ errors[control.id] }}</span>
	</div>
</template>

<script>
export default {
	name: 'FormText',
	props: {
		control: Object,
		formDataResult: Object,
		errors: Object,
	},
	mounted() {
		console.log('formText', this.control)
	}
};
</script>
