<template>
	<div class="label-caption">
		<label :for="control.id">{{ control.caption }}</label>
		
	</div>
</template>

<script>
export default {
	name: 'FormLabel',
	props: {
		control: Object,
		formDataResult: Object,
		errors: Object,
	},
};
</script>
