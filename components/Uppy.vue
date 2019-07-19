<template>
  <div ref="container"/>
</template>

<script>
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import KEY from '../index'

export default {
  name: 'Uppy',
  data () {
    return {
      uppy: null
    }
  },
  mounted () {
    this.setupUppy()
  },
  methods: {
    createUppyStore () {
      return {
        getState: () => this.$store.state[KEY].state,
        setState: (patch) => this.$store.dispatch(KEY + '/setState', patch),
        subscribe: (listener) => this.$store.dispatch(KEY + '/subscribe', listener)
      }
    },
    setupUppy () {
      this.uppy = Uppy({
        store: this.createUppyStore(),
        debug: true,
        autoProceed: false,
        allowMultipleUploads: false,
        restrictions: {
          maxFileSize: 10000000,
          maxNumberOfFiles: 1,
          minNumberOfFiles: 1,
          allowedFileTypes: ['image/*']
        }
      })

      this.uppy.use(Dashboard, {
        inline: true,
        target: this.$refs.container,
        replaceTargetContent: true,
        showProgressDetails: true,
        hideUploadButton: true,
        height: 325,
        proudlyDisplayPoweredByUppy: false,
        browserBackButtonClose: true
      })

      this.uppy.on('file-added', file => this.$emit('file-added', file))
      this.uppy.on('file-removed', file => this.$emit('file-removed', file))
      this.uppy.on('upload', data => this.$emit('upload', data))
      this.uppy.on('upload-progress', (file, progress) => this.$emit('upload-progress', file, progress))
      this.uppy.on('upload-success', (file, response) => this.$emit('upload-success', file, response))
      this.uppy.on('complete', result => this.$emit('complete', result))
      this.uppy.on('error', () => this.$emit('error'))
      this.uppy.on('upload-error', (file, error, response) => this.$emit('upload-error', file, error, response))
      this.uppy.on('upload-retry', fileID => this.$emit('upload-retry', fileID))
      this.uppy.on('info-visible', () => this.$emit('info-visible'))
      this.uppy.on('cancel-all', () => this.$emit('cancel-all'))
      this.uppy.on('restriction-failed', (file, error) => this.$emit('restriction-failed', file, error))
    }
  }
}
</script>

<style src="@uppy/core/dist/style.min.css"></style>
<style src="@uppy/dashboard/dist/style.min.css"></style>
