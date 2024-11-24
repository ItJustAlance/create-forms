<template>
	<div>
		<div style="margin-bottom: 10px" v-for="(option, index) in control.options" :key="index">
			<input
					:id="`rad-${index}`"
					type="radio"
					:name="`${control.control}-${control.id}`"
					:checked="formDataResult[control.id] === option.value"
					:value="option.value"
					@change="$emit('input', { id: control.id, value: $event.target.value })"
			/>
			<label :for="`rad-${index}`">{{ option.label }}</label>
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


	}
};
</script>
