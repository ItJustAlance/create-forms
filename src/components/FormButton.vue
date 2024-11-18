<template>
	<div>
		<button
				@click="onClick()">
			{{ control.caption }}
		</button>
		
	</div>
</template>

<script>
export default {
	name: 'FormButton',
	props: {
		control: Object,
		formDataResult: Object,
		errors: Object,
	},
	methods:{
		onClick(){
			this.$emit('button-click', this.control)
		}
	}
};
</script>
